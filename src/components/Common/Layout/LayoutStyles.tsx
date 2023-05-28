import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

export function GlobalStyles() {
    return (
        <Global
            styles={css`
                * {
                    box-sizing: border-box;
                    padding: 0px;
                    margin: 0px;
                    list-style-type: none;
                    font-family: "Roboto", "Helvetica", sans-serif;
                }

                button:focus {
                    outline: none;
                }

                input,
                label,
                textarea,
                button,
                select,
                a {
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                }
            `}
        />
    );
}

export const ContentWrap = styled.div`
    width: 100%;
    height: calc(100vh - 30px);
    overflow-y: auto;
`;
