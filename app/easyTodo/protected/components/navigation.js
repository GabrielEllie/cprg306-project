import React from 'react';

export function Navigation() {
    
    return (
        <div className="flex flex-row items-center absolute bottom-0 w-screen h-20">
                <div className="flex w-full h-full bg-red-500 items-center align-middle justify-center">  
                    <button className="flex flex-row ">
                        <img 
                            src="./images/overview.png" 
                            alt="picture of a magnifying glass"
                            className="h-full w-full mr-2 max-h-10 max-w-10 border-2 " 
                        />  
                        <h3 className="text-3xl">Overview</h3>
                    </button>
                </div>
                <div className="flex w-full h-full bg-blue-500 items-center align-middle justify-center">  
                    <button className="flex flex-row ">
                        <img 
                            src="./images/overview.png" 
                            alt="picture of a magnifying glass"
                            className="h-full w-full mr-2 max-h-10 max-w-10 border-2" 
                        />  
                        <h3 className="text-3xl">Manage</h3>
                    </button>
                </div>
                
        </div>
    );
};
