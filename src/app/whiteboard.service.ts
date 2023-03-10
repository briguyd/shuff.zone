import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Disc } from './disc';

@Injectable({
  providedIn: 'root'
})
export class WhiteboardService {

  private discData: Disc[] = [];
  private lastSelectedDisc: Disc | undefined;

  private index = 0;

  private discsUpdatedSource = new Subject<Disc[]>();

  // Observable string streams
  discsUpdated$ = this.discsUpdatedSource.asObservable();
  constructor() {
  }

  private discCount(color?: 'YELLOW' | 'BLACK'): number {
    if (!color) {
      return this.discData.length;
    }
    return this.discData.filter(d => d.color === color).length;
  }

  addDisc(color: 'YELLOW' | 'BLACK', blockBlack = false, blockYellow = false, position?: [number, number]) {

    const count = this.discCount(color);
    if (count >= 4) {
      return;
    }
    if (!position) {
      let xPos = color === 'YELLOW' ? 3.5 : .5;
      xPos = xPos + (count * 0.6);
      position = [xPos, 0.5];
    }

    this.discData.push({
      color: color,
      blockBlack: blockBlack,
      blockYellow: blockYellow,
      position: position,
      index: this.index++
    });

    this.discsUpdatedSource.next(this.discs);
  }

  removeAllDiscs() {
    this.discData = [];
    this.discsUpdatedSource.next(this.discs);
  }

  get discs(): Disc[] {
    return this.discData;
  }

  selectDisc(disc: Disc) {
    this.lastSelectedDisc = disc;
  }

  toggleSelectedBlockBlack() {
    if (this.lastSelectedDisc) {
      this.lastSelectedDisc.blockBlack = !this.lastSelectedDisc?.blockBlack;
    }
    this.discsUpdatedSource.next(this.discs);
  }

  toggleSelectedBlockYellow() {
    if (this.lastSelectedDisc) {
      this.lastSelectedDisc.blockYellow = !this.lastSelectedDisc?.blockYellow;
    }
    this.discsUpdatedSource.next(this.discs);
  }

  removeSelectedDisc() {
    if (this.lastSelectedDisc) {
      const index = this.discData.indexOf(this.lastSelectedDisc);
      if (index >= 0) {
        this.discData.splice(index, 1);
      }
    }
    this.lastSelectedDisc = undefined;
    this.discsUpdatedSource.next(this.discs);
  }

  get selectedDisc(): Disc | undefined {
    return this.lastSelectedDisc;
  }
}
