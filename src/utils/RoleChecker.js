import React from 'react';
import { useSelector } from 'react-redux';

const RoleChecker = ({ children, allowedRoles = [] }) => {
    const userRole = useSelector(({ auth }) => {
        const role = auth.user?.role;
        if (Array.isArray(role) && role.length > 0) return role[0];
        return role;
    });

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) return null;

    return <>{children}</>;
};

export default RoleChecker;
