import Token from './Token';
import { getWordForm, isEmpty } from '../utils/helpers';

type Options = Partial<{
    min: number;
    max: number;
    prefix: string;
}>

class TokenCollection {
    private readonly _prefix: string = '#';

    private _min: number = 1;
    private _max: number = Number.POSITIVE_INFINITY;
    private _collection: Array<Token> = [];

    private _isTokenExist(token: Token): boolean {
        return this._collection.map(token => token.id).includes(token.id);
    }

    private _add(token: Token): void {
        if (this._isTokenExist(token)) throw new Error('Token already exists');
        this._collection = [...this._collection, token];
    }

    private _fill(value: string): void {
        const rawTokens = value.split(' ');
        const errors: Record<string, number> = {};
        for (const rawToken of rawTokens) {
            try {
                const token = new Token(rawToken, 0, { min: this._min, max: this._max });
                this._add(token);
            } catch (e) {
                let key;
                if (typeof e === 'string') {
                    key = e;
                } else if (e instanceof Error) {
                    key = e.message;
                }
                if (key) errors[key] = (errors[key] ?? 0) + 1;
            }
        }
        if (!isEmpty(errors)) {
            console.log(
                Object
                    .entries(errors)
                    .map(([message, amount]) => (
                        `${message}: ${amount} ${getWordForm(amount, 'token', 'tokens')} ${getWordForm(amount, 'was', 'were')} ignored`
                    ))
                    .join('\n')
            );
        }
    }

    constructor(value?: string, options?: Options) {
        if (options?.prefix != undefined) this._prefix = options.prefix;
        if (options?.min != undefined) this._min = options.min;
        if (options?.max != undefined) this._max = options.max;
        if (!value) return;
        this._fill(value);
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value < this._max ? value : this._max - 1;
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value > this._min ? value : this._min + 1;
    }

    get tags(): Array<string> {
        return this._collection.map(token => `${this._prefix}${token.value}`);
    }

    get array(): Array<string> {
        return this._collection.map(token => token.value);
    }

    get collection(): Array<Token> {
        return this._collection;
    }

    public fill(value?: string) {
        this._collection = [];
        if (value) this._fill(value);
    }

    public getById(id: string): Token | undefined {
        return this._collection.find(token => token.id === id);
    }

    public add(token: Token): boolean;
    public add(value: string, popularity: number, options?: Options): boolean;
    public add(tokenOrValue: Token | string, popularity: number = 0, options?: Options): boolean {
        try {
            if (tokenOrValue instanceof Token) {
                this._add(tokenOrValue);
            } else {
                const token = new Token(tokenOrValue, popularity, options);
                this._add(token);
            }
            return true;
        } catch {
            return false;
        }
    }

    public remove(token: Token): void;
    public remove(value: string): void;
    public remove(tokenOrValue: Token | string): void {
        if (tokenOrValue instanceof Token) {
            if (!this._isTokenExist(tokenOrValue)) return;
            this._collection = this._collection.filter(_token => _token.id !== tokenOrValue.id);
        } else {
            const token = this._collection.find(token => token.value === tokenOrValue);
            if (token) this._collection = this._collection.filter(_token => _token.id !== token.id);
        }
    }

    public has(token: Token): boolean;
    public has(value: string): boolean;
    public has(tokenOrValue: Token | string): boolean {
        if (tokenOrValue instanceof Token) {
            return this._isTokenExist(tokenOrValue);
        } else {
            return !!this._collection.find(token => token.value === tokenOrValue);
        }
    }
}

const tokens = new TokenCollection();

export { TokenCollection as default, tokens }