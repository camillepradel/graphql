/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DirectiveNode, NamedTypeNode } from "graphql";
import type {
    RelationField,
    ConnectionField,
    CypherField,
    PrimitiveField,
    CustomEnumField,
    CustomScalarField,
    UnionField,
    InterfaceField,
    ObjectField,
    DateTimeField,
    PointField,
    Auth,
    BaseField,
} from "../types";
import Exclude from "./Exclude";

export interface NodeConstructor {
    name: string;
    relationFields: RelationField[];
    connectionFields: ConnectionField[];
    cypherFields: CypherField[];
    primitiveFields: PrimitiveField[];
    scalarFields: CustomScalarField[];
    enumFields: CustomEnumField[];
    otherDirectives: DirectiveNode[];
    unionFields: UnionField[];
    interfaceFields: InterfaceField[];
    interfaces: NamedTypeNode[];
    objectFields: ObjectField[];
    dateTimeFields: DateTimeField[];
    pointFields: PointField[];
    ignoredFields: BaseField[];
    auth?: Auth;
    exclude?: Exclude;
    description?: string;
}

class Node {
    public name: string;

    public relationFields: RelationField[];

    public connectionFields: ConnectionField[];

    public cypherFields: CypherField[];

    public primitiveFields: PrimitiveField[];

    public scalarFields: CustomScalarField[];

    public enumFields: CustomEnumField[];

    public otherDirectives: DirectiveNode[];

    public unionFields: UnionField[];

    public interfaceFields: InterfaceField[];

    public interfaces: NamedTypeNode[];

    public objectFields: ObjectField[];

    public dateTimeFields: DateTimeField[];

    public pointFields: PointField[];

    public ignoredFields: BaseField[];

    public exclude?: Exclude;

    public auth?: Auth;

    public description?: string;

    /*
        Fields you can apply auth allow and bind to
    */
    public authableFields: (
        | PrimitiveField
        | CustomScalarField
        | CustomEnumField
        | UnionField
        | ObjectField
        | DateTimeField
        | PointField
        | CypherField
    )[];

    /*
        Fields you can set in a create or update mutation
    */
    public mutableFields: (
        | PrimitiveField
        | CustomScalarField
        | CustomEnumField
        | UnionField
        | ObjectField
        | DateTimeField
        | PointField
    )[];

    constructor(input: NodeConstructor) {
        this.name = input.name;
        this.relationFields = input.relationFields;
        this.connectionFields = input.connectionFields;
        this.cypherFields = input.cypherFields;
        this.primitiveFields = input.primitiveFields;
        this.scalarFields = input.scalarFields;
        this.enumFields = input.enumFields;
        this.otherDirectives = input.otherDirectives;
        this.unionFields = input.unionFields;
        this.interfaceFields = input.interfaceFields;
        this.interfaces = input.interfaces;
        this.objectFields = input.objectFields;
        this.dateTimeFields = input.dateTimeFields;
        this.pointFields = input.pointFields;
        this.ignoredFields = input.ignoredFields;
        this.exclude = input.exclude;
        this.auth = input.auth;
        this.description = input.description;

        this.authableFields = [
            ...input.primitiveFields,
            ...input.scalarFields,
            ...input.enumFields,
            ...input.unionFields,
            ...input.objectFields,
            ...input.dateTimeFields,
            ...input.pointFields,
            ...input.cypherFields,
        ];

        this.mutableFields = [
            ...input.dateTimeFields,
            ...input.enumFields,
            ...input.objectFields,
            ...input.scalarFields,
            ...input.primitiveFields,
            ...input.interfaceFields,
            ...input.objectFields,
            ...input.unionFields,
            ...input.pointFields,
        ];
    }
}

export default Node;
