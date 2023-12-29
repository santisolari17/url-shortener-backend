import { IsDateString, IsEnum, IsString, IsUUID } from 'class-validator';
import { EAppEventTypes } from '../enums/EAppEventTypes';
import { v4 as uuidv4 } from 'uuid';

type IncreaseClickAppEventProps = {
  eventId?: string;
  eventReferenceId: string;
  eventTableReference: string;
  eventTablePropertyReference;
  lastVisited: string;
};

export class IncreaseClickAppEvent {
  @IsUUID()
  eventId: string;

  @IsEnum(EAppEventTypes)
  eventType: EAppEventTypes;

  @IsString()
  eventReferenceId: string;

  @IsString()
  eventTableReference: string;

  @IsString()
  eventTablePropertyReference: string;

  @IsDateString()
  lastVisited: string;

  constructor(props: IncreaseClickAppEventProps) {
    this.eventId = props.eventId ? props.eventId : uuidv4();
    this.eventType = EAppEventTypes.IncreaseClickEvent;
    this.eventReferenceId = props.eventReferenceId;
    this.eventTableReference = props.eventTableReference;
    this.eventTablePropertyReference = props.eventTablePropertyReference;
    this.lastVisited = props.lastVisited;
  }
}
