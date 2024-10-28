import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className=" flex flex-col bg-transparent rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex flex-auto flex-col justify-center items-center ">
                    <div className="flex justify-center">
                        <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
