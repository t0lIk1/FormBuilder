import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("./users.model").User>;
    update(req: Request, dto: CreateUserDto): Promise<import("./users.model").User>;
    getAll(): Promise<import("./users.model").User[]>;
    getUser(req: Request): Promise<import("./users.model").User | null>;
    getOneByEmail(email: string): Promise<import("./users.model").User | null>;
    delete(body: {
        ids: number[];
    }): Promise<void>;
    deleteMe(req: Request): Promise<number>;
    block(body: {
        ids: number[];
    }): Promise<void>;
    unblock(body: {
        ids: number[];
    }): Promise<void>;
    toggleRole(body: {
        ids: number[];
    }): Promise<{
        length: number;
        toString(): string;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
        pop(): {
            id: number;
            newRole: string;
        } | undefined;
        push(...items: {
            id: number;
            newRole: string;
        }[]): number;
        concat(...items: ConcatArray<{
            id: number;
            newRole: string;
        }>[]): {
            id: number;
            newRole: string;
        }[];
        concat(...items: ({
            id: number;
            newRole: string;
        } | ConcatArray<{
            id: number;
            newRole: string;
        }>)[]): {
            id: number;
            newRole: string;
        }[];
        join(separator?: string): string;
        reverse(): {
            id: number;
            newRole: string;
        }[];
        shift(): {
            id: number;
            newRole: string;
        } | undefined;
        slice(start?: number, end?: number): {
            id: number;
            newRole: string;
        }[];
        sort(compareFn?: ((a: {
            id: number;
            newRole: string;
        }, b: {
            id: number;
            newRole: string;
        }) => number) | undefined): {
            id: number;
            newRole: string;
        }[];
        splice(start: number, deleteCount?: number): {
            id: number;
            newRole: string;
        }[];
        splice(start: number, deleteCount: number, ...items: {
            id: number;
            newRole: string;
        }[]): {
            id: number;
            newRole: string;
        }[];
        unshift(...items: {
            id: number;
            newRole: string;
        }[]): number;
        indexOf(searchElement: {
            id: number;
            newRole: string;
        }, fromIndex?: number): number;
        lastIndexOf(searchElement: {
            id: number;
            newRole: string;
        }, fromIndex?: number): number;
        every<S extends {
            id: number;
            newRole: string;
        }>(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => U, thisArg?: any): U[];
        filter<S extends {
            id: number;
            newRole: string;
        }>(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => value is S, thisArg?: any): S[];
        filter(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): {
            id: number;
            newRole: string;
        }[];
        reduce(callbackfn: (previousValue: {
            id: number;
            newRole: string;
        }, currentValue: {
            id: number;
            newRole: string;
        }, currentIndex: number, array: {
            id: number;
            newRole: string;
        }[]) => {
            id: number;
            newRole: string;
        }): {
            id: number;
            newRole: string;
        };
        reduce(callbackfn: (previousValue: {
            id: number;
            newRole: string;
        }, currentValue: {
            id: number;
            newRole: string;
        }, currentIndex: number, array: {
            id: number;
            newRole: string;
        }[]) => {
            id: number;
            newRole: string;
        }, initialValue: {
            id: number;
            newRole: string;
        }): {
            id: number;
            newRole: string;
        };
        reduce<U>(callbackfn: (previousValue: U, currentValue: {
            id: number;
            newRole: string;
        }, currentIndex: number, array: {
            id: number;
            newRole: string;
        }[]) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: {
            id: number;
            newRole: string;
        }, currentValue: {
            id: number;
            newRole: string;
        }, currentIndex: number, array: {
            id: number;
            newRole: string;
        }[]) => {
            id: number;
            newRole: string;
        }): {
            id: number;
            newRole: string;
        };
        reduceRight(callbackfn: (previousValue: {
            id: number;
            newRole: string;
        }, currentValue: {
            id: number;
            newRole: string;
        }, currentIndex: number, array: {
            id: number;
            newRole: string;
        }[]) => {
            id: number;
            newRole: string;
        }, initialValue: {
            id: number;
            newRole: string;
        }): {
            id: number;
            newRole: string;
        };
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: {
            id: number;
            newRole: string;
        }, currentIndex: number, array: {
            id: number;
            newRole: string;
        }[]) => U, initialValue: U): U;
        find<S extends {
            id: number;
            newRole: string;
        }>(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, obj: {
            id: number;
            newRole: string;
        }[]) => value is S, thisArg?: any): S | undefined;
        find(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, obj: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): {
            id: number;
            newRole: string;
        } | undefined;
        findIndex(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, obj: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): number;
        fill(value: {
            id: number;
            newRole: string;
        }, start?: number, end?: number): {
            id: number;
            newRole: string;
        }[];
        copyWithin(target: number, start: number, end?: number): {
            id: number;
            newRole: string;
        }[];
        entries(): ArrayIterator<[number, {
            id: number;
            newRole: string;
        }]>;
        keys(): ArrayIterator<number>;
        values(): ArrayIterator<{
            id: number;
            newRole: string;
        }>;
        includes(searchElement: {
            id: number;
            newRole: string;
        }, fromIndex?: number): boolean;
        flatMap<U, This = undefined>(callback: (this: This, value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => U | readonly U[], thisArg?: This | undefined): U[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        at(index: number): {
            id: number;
            newRole: string;
        } | undefined;
        findLast<S extends {
            id: number;
            newRole: string;
        }>(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => value is S, thisArg?: any): S | undefined;
        findLast(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): {
            id: number;
            newRole: string;
        } | undefined;
        findLastIndex(predicate: (value: {
            id: number;
            newRole: string;
        }, index: number, array: {
            id: number;
            newRole: string;
        }[]) => unknown, thisArg?: any): number;
        toReversed(): {
            id: number;
            newRole: string;
        }[];
        toSorted(compareFn?: ((a: {
            id: number;
            newRole: string;
        }, b: {
            id: number;
            newRole: string;
        }) => number) | undefined): {
            id: number;
            newRole: string;
        }[];
        toSpliced(start: number, deleteCount: number, ...items: {
            id: number;
            newRole: string;
        }[]): {
            id: number;
            newRole: string;
        }[];
        toSpliced(start: number, deleteCount?: number): {
            id: number;
            newRole: string;
        }[];
        with(index: number, value: {
            id: number;
            newRole: string;
        }): {
            id: number;
            newRole: string;
        }[];
        [Symbol.iterator](): ArrayIterator<{
            id: number;
            newRole: string;
        }>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            at?: boolean | undefined;
            findLast?: boolean | undefined;
            findLastIndex?: boolean | undefined;
            toReversed?: boolean | undefined;
            toSorted?: boolean | undefined;
            toSpliced?: boolean | undefined;
            with?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
        };
        message: string;
    }>;
}
