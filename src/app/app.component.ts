import { SignalService } from 'src/app/shared/services/signal.service';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grading-system-web';

  constructor(private router: Router,
    // private routingState: RoutingStateService,
    // private jsMapProvider: JsMapsProviderService,\
    private signals: SignalService
    ) {
    // configure API
    // initApiStaging();

    // initApiProduction();

    // initApiLocal();

  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      this.signals.setLoaderNonBlocking(false);
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    // this.routingState.loadRouting(); // Initilize browsing history
  }
}




