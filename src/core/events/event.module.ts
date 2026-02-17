import { Global, Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NestEventBusService } from "./nest-event.bus.services";
import { EVENT_BUS } from "./event.bus";

@Global()
@Module({
    imports: [EventEmitterModule],
    providers: [{provide: EVENT_BUS, useClass: NestEventBusService}],
    exports:[EVENT_BUS]
})

export class eventModule {}