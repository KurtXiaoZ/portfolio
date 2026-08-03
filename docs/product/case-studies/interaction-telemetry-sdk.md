# Standardizing Interaction Telemetry at Scale

## Status

Selected for the initial portfolio. Narrative development and publication review are pending.

## Resume Statement

> Implemented a telemetry-agnostic TypeScript SDK that standardizes user interaction status and latency instrumentation through a reducer-based state machine and Pub/Sub event pipeline, supporting 350+ customer interactions and capturing 30M+ daily UI interaction lifecycle events.

## Core Story

Show how Kurt created a shared interaction model and vendor-neutral SDK that made high-volume UI status and latency telemetry consistent across a large application surface.

## Intended Audience Takeaway

Kurt can turn fragmented observability needs into a reusable platform with a well-defined state model, extensible event pipeline, and large-scale adoption.

## Initial Narrative

1. The inconsistency or observability gap before the SDK
2. Requirements for a telemetry-agnostic interaction model
3. Modeling interaction lifecycles with a reducer-based state machine
4. Decoupling producers and consumers through Pub/Sub
5. SDK integration and migration across customer interactions
6. Scaling to tens of millions of daily lifecycle events
7. Reliability, adoption, and operational outcomes

## Evidence to Gather

- a public-safe interaction state diagram
- the event flow from UI interaction to telemetry consumer
- a sanitized SDK integration example
- adoption progression across the 350+ interactions
- event volume, delivery, and performance measurements

## Open Questions

- What inconsistency or failure mode existed before the SDK?
- What qualifies as one of the 350+ customer interactions?
- How are the 30M+ lifecycle events counted?
- What performance overhead and delivery guarantees were required?
- What measurable product or engineering outcomes followed adoption?
