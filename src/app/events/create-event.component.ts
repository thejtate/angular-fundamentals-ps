import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/index';

@Component({
  templateUrl: './create-event.component.html',
  styles: [`
  em: {float: right; color: #E05C65; padding-left: 10px;}
  .error input{background-color: #EC3C53;}
`]
})

export class CreateEventComponent {
  newEvent;
  public isDirty: boolean = true;

  constructor(private router: Router, private eventService: EventService) {

  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
