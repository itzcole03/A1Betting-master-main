import React from 'react.ts';
import { UserConstraints } from '@/types.ts';
interface UserConstraintsFormProps {
    constraints: UserConstraints;
    onConstraintsChange: (field: keyof UserConstraints, value: unknown) => void;
}
export declare const UserConstraintsForm: React.FC<UserConstraintsFormProps>;
export {};
