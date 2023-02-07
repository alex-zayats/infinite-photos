import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../services/favorites-service/favorites.service';

@Component({
  standalone: true,
  selector: 'app-favorites-component',
  templateUrl: './favorites.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./favorites.component.scss']
})
export class AppFavoritesComponent implements OnInit {
  favorites$: Observable<string[]>;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favorites$ = this.favoritesService.favorites$.asObservable();
  }
}
