// types/request.d.ts

declare module 'express' {
  interface Request {
    user?: {
      id: number;
    };
  }
}
