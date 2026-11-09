import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            <Sidebar />
            <main className="flex-1 relative h-full w-full overflow-hidden stage-gradient p-4 md:p-8 flex items-center justify-center">
                <div className="w-full h-full max-w-5xl relative">
                    {children}
                </div>
            </main>
        </div>
    );
};
