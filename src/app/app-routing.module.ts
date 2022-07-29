import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { TraitBiasComponent } from './modules/trait-bias/trait-bias.component';
import { RouteGuard } from './core/guard/route.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'' , redirectTo:'home' ,pathMatch:'full'},
  { path: 'b-inprogress', 
    loadChildren:()=>import('./modules/b-inprogrss/b-inprogrss.module').then(m=>m.BInprogrssModule)
  },
  { path: 'breed-outcome',
    loadChildren:()=>import('./modules/breed-outcome/breed-outcome.module').then(m=>m.BreedOutcomeModule)   
  },
  { path:'breeding-room',
    loadChildren:()=>import('./modules/breeding-room/breeding-room.module').then(m=>m.BreedingRoomModule)   
  },
  { path: 'match', 
    loadChildren:()=>import('./modules/match/match.module').then(m=>m.MatchModule)
  },
  { path: 'nft-detail', 
    loadChildren:()=>import('./modules/nft-detail/nft-detail.module').then(m=>m.NftDetailModule)
  },
  { path: 'nft-selectt',
    loadChildren:()=>import('./modules/nft-select/nft-select.module').then(m=>m.NftSelectModule) 
  },
  { path: 'profile',
    loadChildren:()=>import('./modules/profile/profile.module').then(m=>m.ProfileModule) 
  },
  { path: 'superLike',
    loadChildren:()=>import('./modules/reply-super-like/reply-super-like.module').then(m=>m.ReplySuperLikeModule) 
  },
  { path: 'select-breed', 
    loadChildren:()=>import('./modules/select-breed/select-breed.module').then(m=>m.SelectBreedModule) 
  },
  { path: 'super-powers', 
    loadChildren:()=>import('./modules/super-powers/super-powers.module').then(m=>m.SuperPowersModule) 
  },

  { path: 'target-select',
    loadChildren:()=>import('./modules/target-select/target-select.module').then(m=>m.TargetSelectModule) 
  },
  { path: 'trait-bias',
    loadChildren:()=>import('./modules/trait-bias/trait-bias.module').then(m=>m.TraitBiasModule) 
  },
  { path: 'b-inprogress-list',
    loadChildren:()=>import('./modules/b-inprogress-list/b-inprogress-list.module').then(m=>m.BInprogressListModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
