import React from "react";


type Wrapper = React.ComponentClass<any, any> | ((...params: any[]) => React.ReactNode);

export interface WrappingConfiguration {

    type: React.ComponentClass<any, any>;
    with: Wrapper[];
}

export interface AutoWrapperConfiguration {

    wrappers: WrappingConfiguration[];
}
