import React from 'react';

export function Navigation({setPageFunc}) {

    const handleOverviewPress = () => setPageFunc("overview");
    const handleManagePress = () => setPageFunc("manage");
    
    return (
        <div className="flex flex-row items-center absolute bottom-0 w-screen h-20">
                <div className="flex w-full h-full bg-lime-800 items-center align-middle justify-center text-black">  
                    <button className="flex flex-row"
                        onClick={handleOverviewPress}
                    >
                        <img 
                            // src="./images/overview.png" 
                            src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/dashboard-line-icon.png" 
                            alt="picture of a circular meter"
                            className="h-full w-full mr-2 max-h-10 max-w-10" 
                        />  
                        <h3 className="text-3xl">Overview</h3>
                    </button>
                </div>
                <div className="flex w-full h-full bg-blue-500 items-center align-middle justify-center">  
                    <button className="flex flex-row "
                        onClick={handleManagePress}
                    >
                        <img 
                            // src="./images/overview.png" 
                            src="https://uxwing.com/wp-content/themes/uxwing/download/tools-equipment-construction/gear-icon.png" 
                            alt="picture of a gear icon"
                            className="h-full w-full mr-2 max-h-10 max-w-10 " 
                        />  
                        <h3 className="text-3xl">Manage</h3>
                    </button>
                </div>
                
        </div>
    );
};
