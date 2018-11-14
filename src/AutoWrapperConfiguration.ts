import React from "react";


type Wrapper = React.ComponentClass | ((...params: any[]) => React.ReactNode);

export interface WrappingConfiguration {

    type: React.ReactType;
    with: Wrapper[];
}

export interface AutoWrapperConfiguration {

    wrappers: WrappingConfiguration[];
}
