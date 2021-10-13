export interface Command<S, T> {
    execute(params: S): Promise<T>
}
