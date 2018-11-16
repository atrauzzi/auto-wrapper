import _ from "lodash";
import React from "react";
import { AutoWrapperConfiguration } from "./AutoWrapperConfiguration";


const { Provider, Consumer } = React.createContext<AutoWrapperConfiguration>(null);

interface Props {

    configuration?: AutoWrapperConfiguration;
}

class AutoWrapperComponent extends React.Component<Props> {

    public static defaultProps: Props = {

        configuration: {
            wrappers: [],
        },
    };

    public render() {

        return this.renderChildren(this.props.children);
    }

    private renderChildren(children: React.ReactNode): React.ReactNode {

        if (!children) {

            return null;
        }

        const renderedChildren = React.Children.map(children, (child) =>
            this.renderChild(child));

        return renderedChildren.length === 1 ? renderedChildren[0] : renderedChildren;
    }

    private renderChild(child: React.ReactNode): React.ReactNode {

        if (React.isValidElement(child)) {

            const childElement = child as React.ReactElement<React.Props<any>>;

            return _.chain(this.props.configuration.wrappers)
                .filter((wrapper: React.ReactElement<any>) => wrapper.type === child.type)
                .flatMap("with")
                .reverse()
                .reduce((previousElement: React.ReactElement<any>, CurrentWrapper: React.ReactType) =>
                    <CurrentWrapper
                        children={previousElement}
                    />,
                    React.cloneElement(
                        childElement,
                        {},
                        this.renderChildren(childElement.props.children)
                    )
                )
                .value();
        }

        return child;
    }
}

export function AutoWrapper(props: Props & React.Props<any>) {

    return <Consumer>
        { 
            (configuration) => <AutoWrapperComponent
                {...props}
                configuration={configuration}
            />
        }
    </Consumer>;
}

export const AutoWrapperProvider = Provider;
