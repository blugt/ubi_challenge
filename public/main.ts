require('../node_modules/zone.js/dist/zone.js');
require('../node_modules/reflect-metadata/Reflect.js');
require('./styles/main.scss');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppModule } from './app.module';


platformBrowserDynamic().bootstrapModule(AppModule);