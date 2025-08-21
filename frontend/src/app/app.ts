import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.services';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('frontend');

}
