import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const plataformId = inject(PLATFORM_ID)

  if(isPlatformBrowser(plataformId)){
    const token = localStorage.getItem('token')
    if(!token){
      router.navigate(['/initial/login'])
      return false
    }
  }

  return true;
};
