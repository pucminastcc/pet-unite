import {PassportStrategy} from '@nestjs/passport';
import {Profile, Strategy} from 'passport-facebook';
import {Injectable} from '@nestjs/common';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.API_URL}/auth/facebook/redirect`,
            scopeSeparator: 'email',
            profileFields: ['id', 'email', 'name', 'picture.type(large)'],
            authType: 'reauthenticate'
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const {id, name, emails, photos} = profile;

        await this.authService.register({
            username: name.givenName,
            email: emails[0].value,
            password: id,
            terms: true,
            activated: true,
            provider: 'facebook',
            img: ''
        });

        const payload = await this.authService.validateFacebookUser({
            email: emails[0].value,
            id,
            img: photos[0]?.value
        });

        done(null, payload);
    }
}
