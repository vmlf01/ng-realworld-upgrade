export abstract class StorageService {
    save(key: string, value: any) {}
    get(key: string): any {}
    destroy(key: string) {}
}
