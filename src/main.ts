import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/service/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
