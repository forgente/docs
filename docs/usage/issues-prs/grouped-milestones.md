---
date: "2026-07-19T00:00:00+00:00"
slug: "grouped-milestones"
sidebar_position: 14
---

# Grouped milestone overview

For organizations that use the same milestone names across several repositories (for example a `v2.0` milestone tracked separately in each component repo), Forgente can roll those up into a single combined view at `/org/{org}/milestones-overview`.

Milestones sharing the same name, case-insensitively, across the organization's repositories are grouped into one card showing:

- A combined progress bar and percentage across all grouped milestones.
- Total open and closed issue counts, summed across the group.
- The earliest due date among the grouped milestones.
- A link to each member repository's own milestone page.

Milestones themselves are unaffected and stay scoped to their own repository; the grouped view is a read-only summary computed on top of them.

## Opening the grouped view

1. Go to an organization's **Milestones** dashboard.
2. Select **Grouped view**. This link is hidden when you're viewing milestones filtered to a specific team, since the overview is always organization-wide.
3. Use the **Open** / **Closed** links (`?state=open` / `?state=closed`) to switch which milestones are grouped.

## Requirements

Viewing the grouped overview requires organization membership and the milestones dashboard to be enabled on the instance.
