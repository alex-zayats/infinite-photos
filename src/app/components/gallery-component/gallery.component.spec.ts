import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppGalleryComponent } from './gallery.component';
import { PhotoService } from '../../services/photos-service/photos.service';
import { FavoritesService } from '../../services/favorites-service/favorites.service';
import { of } from 'rxjs';

describe('AppGalleryComponent', () => {
  let fixture: ComponentFixture<AppGalleryComponent>;
  let component: AppGalleryComponent;
  let photoService: PhotoService;
  let favoritesService: FavoritesService;

  const dummyUrl = 'https://some-photo-url.jpg/';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppGalleryComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGalleryComponent);
    photoService = TestBed.inject(PhotoService);
    favoritesService = TestBed.inject(FavoritesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('loadPhotos', () => {
    it('should set isLoading as true', () => {
      spyOn(component, 'loadPhotos');

      component.loadPhotos(2);

      expect(component.isLoading).toBeTruthy();
    });

    it('should request new photos from service', () => {
      spyOn(component, 'loadPhotos');

      component.loadPhotos(4);

      expect(component.loadPhotos).toHaveBeenCalledWith(4);
    });

    it('should get new photos from service', () => {
      const dummyImages = [of('url1'), of('url2')];
      spyOn(component.photoUrls$, 'push');
      spyOn(photoService, 'getPhotosUrls').and.returnValue(of(dummyImages));

      component.loadPhotos(2);

      expect(component.photoUrls$.push).toHaveBeenCalledWith(...dummyImages);
    });
  });

  describe('toggleFavorite', () => {
    it('should call toggleFavorite in service', () => {
      spyOn(favoritesService, 'toggleFavorite');
      const dummyImg = new Image(5, 5);
      dummyImg.src = dummyUrl;
      const event = new Event('click');
      spyOnProperty(event, 'currentTarget').and.returnValue(dummyImg);

      component.toggleFavorite(event);

      expect(favoritesService.toggleFavorite).toHaveBeenCalledWith(dummyUrl);
    });
  });

  describe('isFavorite', () => {
    it('should return true if photo is favorite', () => {
      spyOn(favoritesService, 'isFavorite').and.returnValue(true);

      expect(component.isFavorite(dummyUrl)).toBeTruthy();
    });

    it('should return false if photo is not favorite', () => {
      spyOn(favoritesService, 'isFavorite').and.returnValue(false);

      expect(component.isFavorite(dummyUrl)).toBeFalsy();
    });
  });

  describe('showPhoto', () => {
    it('should add loaded class to element', () => {
      const dummyImg = new Image(5, 5);
      dummyImg.src = dummyUrl;
      const event = new Event('click');
      spyOnProperty(event, 'currentTarget').and.returnValue(dummyImg);
      spyOn(dummyImg.classList, 'add');

      component.showPhoto(event);

      expect(dummyImg.classList.add).toHaveBeenCalledWith('photo-loaded')
    });
  });
});
