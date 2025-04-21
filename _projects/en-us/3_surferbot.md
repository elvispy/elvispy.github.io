---
page_id: prj_surferbot
layout: page
title: Simulating deformable impacts
description: The kinematic match method
img: #assets/img/surferbot.mp4
importance: 1
category: work
related_publications: true
---

We are all happy calculating the trajectory of an object in free-fall. But how do we actually solve what happens just after that, during an inelastic collision?. The interactions involved are highly nonlinear and oftentimes the colliding objects are free to deform as they are in contact.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="example image" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Simulation example of a solid sphere impacting an elastic membrane.
    </figcaption>
</figure>

This problem is relevant because it has plenty of applications, from soft robots, to gear teeth and even astrophysics. In general, you have a PDE under and some nonlinear constraints that represents the problem. The KM sets a new constraint on the contacting surface by imposing that the angle of incidence between the two objects is smooth. It has the advantage of introducing an intuitive idea (easy to code = can be quickly implemented in industrial setups), while enhancing accuracy.
This framework is agnostic to the technique used to approximate the PDE, so it can be implemented using a finite difference scheme, or finite elements, or even a variational method.

We have successfully implemented the KM for the case of a rigid sphere impacting against an elastic membrane, and are currently working on other cases, most notably a deformable droplet impacting different surfaces -either rigid or not.

We wrote an article (see {% cite aguero2022impact %}) where we studied both experimentally and numerically the coupled deformable imapct between a solid sphere and an elastic membrane.

Current work involves extending this framework to other problems. We are currently working on the problem of a deformable water droplet impacting against a fluid bath. Our model is particularly well suited for low velocity impacts, where direct numerical simulations might become computationally too expensive. Here are three of the repositories we have for these problems:

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
