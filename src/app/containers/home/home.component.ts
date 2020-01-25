import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MeService } from 'src/app/resources/me.service';

@Component({
  selector: 'pt-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  me: any;

  constructor(
    private meService: MeService
  ) { }

  ngOnInit() {
    this.meService.me$
      .pipe(take(1))
      .subscribe(response => {
        this.me = response;
      });

    this.meService.get();
  }
}
