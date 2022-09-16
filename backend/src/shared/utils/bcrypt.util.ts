import * as bcryptjs from 'bcryptjs';

export class BcryptUtil {
  public static hashPassword(password: string): string {
    return bcryptjs.hashSync(password, 12);
  }

  public static comaprePassword(
    password: string,
    hashedPassword: string,
  ): boolean {
    return bcryptjs.compareSync(password, hashedPassword);
  }
}
