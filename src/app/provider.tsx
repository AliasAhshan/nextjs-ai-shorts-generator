import React, {ReactNode} from 'react';

type ProviderProps = {
    children: ReactNode;
};


function Provider({children}: ProviderProps) {
    return (
        <div>
            {children}
        </div>
    )
}

export default Provider