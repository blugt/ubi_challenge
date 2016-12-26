import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongListComponent } from './components/song/song-list.component';
import { SongDetailsComponent } from './components/song/song-details.component';

const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'song-list'
    },
    {
        path: 'song-list',
        component: SongListComponent
    },
    {
        path: 'song-details/:id',
        component: SongDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [SongListComponent, SongDetailsComponent];