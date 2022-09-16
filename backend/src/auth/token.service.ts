import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/shared/domain/dtos/uset.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public varifyTokenValid(
    token: string,
    tokenType: 'access-token' | 'refresh-token',
  ) {
    const res = this.jwtService.verify(token, {
      secret:
        tokenType === 'access-token'
          ? process.env.JWT_ACCESS_TOKEN_SECRET || 'ASDF'
          : process.env.JWT_REFRESH_TOKEN_SECRET || 'ASDF',
    });

    return res !== undefined;
  }

  public decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  public generateAccessToken(user: UserDto) {
    return {
      token: this.jwtService.sign(
        { id: user._id },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: '60s',
        },
      ),
      expires_in: 60,
    };
  }

  public generateRefreshToken(user: UserDto) {
    const expirationTime = 3600 * 24;
    return {
      token: this.jwtService.sign(
        { id: user._id },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: `${expirationTime}s`,
        },
      ),
      expires_in: expirationTime,
    };
  }
}
