import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(withInterceptorsFromDi()),
    ]
  };