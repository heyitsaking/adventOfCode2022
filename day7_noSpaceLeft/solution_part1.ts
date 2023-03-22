var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(`${__dirname}/input.txt`),
});

/*
 * cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
 * cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
 * cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
 * cd / switches the current directory to the outermost directory, /.
 * ls means list. It prints out all of the files and directories immediately contained by the current directory:
 * 123 abc means that the current directory contains a file named abc with size 123.
 * dir xyz means that the current directory contains a directory named xyz.
 */

const DIR_SIZE_THRESHOLD = 100000;

class DirectorySystem {
  private _baseDirectory: Directory | null;
  private _currentDirectory: Directory;

  constructor() {
    this._baseDirectory = null;
    this._currentDirectory = new Directory();
  }

  public set baseDirectory(directory: Directory) {
    this._baseDirectory = directory;
  }

  public get currentDirectory(): Directory {
    return this._currentDirectory;
  }

  public set currentDirectory(directory: Directory) {
    this._currentDirectory = directory;
  }

  public updateSubSizes(): void {
    this._baseDirectory?.updateSubdirectorySize();
  }

  public getTotalSub100k(): number {
    return 0;
  }
}

class Directory {
  private _name: string;
  private _parentDirectory: Directory | null;
  private _directories: Directory[];
  private _files: FileData[];
  private _directorySize: number;
  private _subDirectoriesSize: number;

  constructor(name: string = "", parent: Directory | null = null) {
    this._name = name;
    this._parentDirectory = parent;
    this._directories = [];
    this._files = [];
    this._directorySize = 0;
    this._subDirectoriesSize = 0;
  }

  public get name(): string {
    return this._name;
  }

  public get parent(): Directory | null {
    return this._parentDirectory;
  }

  public get directories(): Directory[] {
    return this._directories;
  }

  public addDirectory(directory: Directory): void {
    this._directories.push(directory);
  }

  public addFile(file: FileData): void {
    this._files.push(file);
    this._directorySize += file.size;
  }

  public getTotalSize(): number {
    let subSize: number = 0;
    this._directories.forEach((directory: Directory) => {
      subSize += directory.getTotalSize();
    });
    return subSize + this._directorySize;
  }

  public updateSubdirectorySize(): void {
    let subSize: number = 0;
    this._directories.forEach((directory: Directory) => {
      subSize += directory._directorySize + directory._subDirectoriesSize;
    });
    this._subDirectoriesSize = subSize;
  }

  public isUnder100k(): number {
    const dirSize = this.getTotalSize();
    if (dirSize < DIR_SIZE_THRESHOLD) {
      return dirSize;
    }
    return 0;
  }

  public findDirectory(dirName: string): Directory | null {
    let match: Directory | null = null;
    this._directories.forEach((directory: Directory) => {
      if (directory.name === dirName) match = directory;
    });
    return match;
  }
}

class FileData {
  private _name: string;
  private _size: number;

  constructor(name: string, size: number) {
    this._name = name;
    this._size = size;
  }

  public get size(): number {
    return this._size;
  }
}

const noSpace = async (): Promise<void> => {
  // Initial Setup
  const fs: DirectorySystem = new DirectorySystem();
  const baseDir = new Directory("/");
  fs.baseDirectory = fs.currentDirectory = baseDir;

  // Read data
  lineReader.on("line", function (line: string) {
    const instruction: string[] = line.split(" ");
    if (instruction.includes("cd")) {
      switch (instruction[2]) {
        case "..":
          if (!fs.currentDirectory.parent) {
            throw new Error(
              "Current directory does not have a parent directory"
            );
          } else {
            fs.currentDirectory = fs.currentDirectory.parent;
          }
          break;
        default:
          const nextDir: Directory | null = fs.currentDirectory.findDirectory(
            instruction[2]
          );
          if (nextDir) {
            fs.currentDirectory = nextDir;
          } else {
            if (instruction[2] === fs.currentDirectory.name) {
              console.log("You already are in this directory");
            } else {
              throw new Error(
                "No directory matching that name was found: " + instruction[2]
              );
            }
          }
          break;
      }
    } else if (!instruction.includes("ls")) {
      let dataType: string | number = +instruction[0];
      let dataName: string = instruction[1];
      switch (isNaN(dataType)) {
        case true:
          const parent: Directory | null = fs.currentDirectory;
          const newDir: Directory = new Directory(dataName, parent);
          fs.currentDirectory.addDirectory(newDir);
          break;
        case false:
          const newFile: FileData = new FileData(dataName, dataType);
          fs.currentDirectory.addFile(newFile);
          break;
        default:
          break;
      }
    }
  });

  await require("events").once(lineReader, "close");
  let result: number = 0;

  const getSumUnder100k = (): void => {};
  // fs.directories.forEach((directory: Directory) => {
  //   if (directory.directories.length > 0) {
  //   }
  // });
  // console.log(fs);
  console.log(result);
};

noSpace();

/*
function sumDirectoriesUnder100000(directory: Directory): number {
  let sum = 0;
  const totalSize = directory.fileSize + getTotalSizeOfSubdirectories(directory);
  if (totalSize < 100000) {
    sum += totalSize;
  }
  return sum;
}

function getTotalSizeOfSubdirectories(directory: Directory): number {
  let totalSize = 0;
  for (const subdirectory of directory.directories) {
    totalSize += subdirectory.fileSize + getTotalSizeOfSubdirectories(subdirectory);
  }
  return totalSize;
}
*/
