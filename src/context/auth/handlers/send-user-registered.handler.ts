import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { AUTH_USER_REGISTERED_EVENT } from "src/context/events/user-registered.event";

@Injectable()
export class SendUserRegisteredEventHandler {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        // Configuration du transporteur Nodemailer
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: this.configService.get<boolean>('MAIL_SECURE', false), // true pour port 465
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASSWORD'),
            },
        });
    }

    @OnEvent(AUTH_USER_REGISTERED_EVENT)
    async handle(payload: { email: string; name: string }) {
        try {
            console.log('Envoi de l\'email à:', payload.email);

            const mailOptions = {
                from: this.configService.get<string>('MAIL_FROM'),
                to: payload.email,
                subject: 'Bienvenue ! Votre inscription est confirmée',
                html: `
                    <h1>Bienvenue ${payload.name} !</h1>
                    <p>Votre compte a été créé avec succès.</p>
                    <p>Merci de vous être inscrit sur notre plateforme.</p>
                `,
                text: `Bienvenue ${payload.name} ! Votre compte a été créé avec succès.`,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email envoyé avec succès:', info.messageId);
            
            return info;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            throw error;
        }
    }
}