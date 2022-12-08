import { ConflictException } from '@nestjs/common';

export class AlreadyExistTaskException extends ConflictException {
  constructor() {
    super();
    this.name = AlreadyExistTaskException.name;
  }
}
