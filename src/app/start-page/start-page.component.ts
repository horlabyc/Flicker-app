import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PhotosService } from '../services/photos.service';
import { catchError, map, tap } from 'rxjs/operators'
import { BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Photo } from '../models/photos';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  searchControl = new FormControl('', [Validators.required]);
  showLoading = false;
  photos: Photo[];
  constructor(
    private photosService: PhotosService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.photosService.photos$.subscribe(photos => {
      console.log(photos)
      this.photos = photos
    });
  }

  reset(){
    this.searchControl.reset();
  }

  updatePhotos(newPhotos: Photo[]) {
    const currentPhotos = this.photosService.photos.getValue();
    this.photosService.photos.next([...currentPhotos, ...newPhotos])
  }

  submit(){
    this.showLoading = true;
    const tag = this.searchControl.value;
    this.photosService.searchPhotos(tag).pipe(
      catchError((error) => of([]).pipe(
        tap(() => {
          this._snackBar.open(error.message, 'Close', {
            verticalPosition: 'top'
          })
        })
      ))
    ).subscribe(res => {
      this.showLoading = false;
      this.updatePhotos(res.photos.photo.map(p => {
        return {
          ...p, tag
        }
      }));
      this.searchControl.reset();
    })
  }
}
