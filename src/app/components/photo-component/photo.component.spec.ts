import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppPhotoComponent } from './photo.component';
import { FavoritesService } from '../../services/favorites-service/favorites.service';

describe('AppPhotoComponent', () => {
  let fixture: ComponentFixture<AppPhotoComponent>;
  let component: AppPhotoComponent;
  let favoritesService: FavoritesService;
  let activatedRoute: ActivatedRoute;

  const dummyUrl = 'https://some-photo-url.jpg/';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppPhotoComponent,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPhotoComponent);
    favoritesService = TestBed.inject(FavoritesService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('removeFavorite', () => {
    it('should call removeFavorite in service', function () {
      spyOn(favoritesService, 'removeFavorite');

      component.removeFavorite(dummyUrl);

      expect(favoritesService.removeFavorite).toHaveBeenCalledWith(dummyUrl);
    });
  })
});
