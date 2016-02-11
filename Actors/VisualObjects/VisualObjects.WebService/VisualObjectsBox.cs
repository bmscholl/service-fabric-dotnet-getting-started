// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace VisualObjects.WebService
{
    using Microsoft.ServiceFabric.Actors;
    using System;
    using System.Collections.Concurrent;

    /// <summary>
    /// This class encapsulates the logic for getting all of the visual object actors and joining their values into a JSON string.
    /// </summary>
    public class VisualObjectsBox : IVisualObjectsBox
    {
        private ConcurrentDictionary<ActorId, string> objectData = new ConcurrentDictionary<ActorId, string>();

        string IVisualObjectsBox.GetJson()
        {
            return "[" + String.Join(",", objectData.Values) + "]";
        }

        void IVisualObjectsBox.SetObjectString(ActorId actorId, string objectJson)
        {
            this.objectData[actorId] = objectJson;
        }
    }
}