// src/app/about/about.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../config/site.config';
import { SmartImgComponent } from '../shared/smart-img/smart-img.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { CountUpDirective } from '../shared/directives/count-up.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, SmartImgComponent, RevealDirective, CountUpDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  site = SITE;
  values = [
    { title: 'Quality first', text: 'We only list parts we would trust in our own workshop.' },
    { title: 'Honest guidance', text: 'We help you pick the right part – not the most expensive one.' },
    { title: 'Reliable service', text: 'Clear communication, fast replies and dependable supply.' },
  ];
}
