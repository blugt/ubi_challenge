import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongListComponent } from './components/song/song-list.component';
import { SongDetailsComponent } from './components/song/song-details.component';

const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: SongListComponent
    },
    {
        path: 'details',
        component: SongDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [SongListComponent, SongDetailsComponent];