import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterModule, IonApp],
})
export class AppComponent {
}

