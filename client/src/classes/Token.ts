type Options = Partial<{
    min: number;
    max: number;
    limit: boolean;
}>

class Token {
    private readonly _id: string;
    private readonly _min: number = 1;
    private readonly _max: number = Number.POSITIVE_INFINITY;
    private readonly _limit: boolean = true;

    private _value: string;
    private _popularity: number;

    private _parseTokenString(value: string): string {
        const token = value
            .trim()
            .replace(/\s+/gu, '_')
            .replace(/[^\p{L}\p{N}_]+/gu, '')
            .slice(0, this._limit ? this._max : undefined);
        if (token.length < this._min) throw new Error(`Length is less than ${this._min} letters`);
        if (token.length > this._max) throw new Error(`Length is greater than ${this._max} letters`);
        return token;
    }

    constructor(value: string, popularity: number = 0, options?: Options) {
        if (options?.limit != undefined) this._limit = options.limit;
        if (options?.min != undefined) this._min = options.min;
        if (options?.max != undefined) this._max = options.max;

        const validToken = this._parseTokenString(value);

        this._id = `token.${validToken.toLowerCase()}`;
        this._value = validToken;
        this._popularity = popularity < 0 ? 0 : popularity;
    }

    get id(): string {
        return this._id;
    }

    set value(value: string) {
        this._value = value;
    }

    get value(): string {
        return this._value;
    }
}

export default Token;