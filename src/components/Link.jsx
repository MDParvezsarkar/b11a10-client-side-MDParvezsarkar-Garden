import React from "react";
import { Link as ReactLink } from "react-router-dom";

const Link = ({route}) => {
    return (
        <li key={route.id}>
            <ReactLink to={route.path}>{route.name}</ReactLink>
        </li>
    )
}
export default Link