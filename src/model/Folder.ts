export class Folder {
  name: string;
  handle: Promise<FileSystemDirectoryHandle>;
  children?: Folder[];

  constructor(
    name: string,
    handle: Promise<FileSystemDirectoryHandle>,
    children?: Folder[]
  ) {
    this.name = name;
    this.handle = handle;
    this.children = children;
  }

  public async getImages(): Promise<File[]> {
    const result: File[] = [];
    if (!this.handle) {
      return result;
    }

    for await (const entity of (await this.handle).values()) {
      if (entity.kind === "file") {
        await this.#getImageFile(entity, result);
      } else {
        await this.#getFilesWithFileSystemDirHandle(entity, result);
      }
    }
    return result;
  }

  async #getImageFile(fileHandle: FileSystemFileHandle, result: File[]) {
    const file = await fileHandle.getFile();
    if (file.type.startsWith("image")) {
      result.push(file);
    }
  }

  async #getFilesWithFileSystemDirHandle(
    dir: FileSystemDirectoryHandle,
    result: File[]
  ): Promise<File[]> {
    for await (const item of dir.values()) {
      if (item.kind === "directory") {
        this.#getFilesWithFileSystemDirHandle(item, result);
      } else {
        this.#getImageFile(item, result);
      }
    }

    return result;
  }
}
