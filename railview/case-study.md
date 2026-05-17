
# Case Study: RailView
## How a Rail Grinding Company Replaced Excel Sheets and Email Reports with Real-Time Operations Intelligence

---

### Client Profile

**Industry:** Rail Transit Maintenance & Operations
**Users:** Field grinding crews, project managers, transit authority stakeholders
**Scale:** Multiple transit authorities across the U.S. West Coast

---

### The Problem

A specialized rail grinding company manages overnight maintenance operations for major transit authorities including Sound Transit and BART. After every shift, field crews need to document exactly what work was performed: where they ground, how many passes, what equipment they used, how long delays lasted, and why.

For years, this process looked like most field services companies:

- **Crews filled out Excel templates** after long overnight shifts --- error-prone, inconsistent, and frequently delayed
- **Reports went out by email** to project managers and transit authority clients, where they sat in inboxes with no structured way to search, aggregate, or analyze them
- **Project managers built their own spreadsheets** to try to answer basic questions: How much track did we grind this month? Where are we falling behind? Which crews have the most downtime?
- **No geographic context** --- work was described in text (milepost references, track names) with no way to see it on a map or identify coverage gaps
- **No audit trail** --- if a client asked "who was on shift last Tuesday and what did they report?", the answer required digging through email chains
- **Onboarding a new client** meant building a new spreadsheet template, a new email distribution list, and hoping everyone followed the same conventions

This isn't a technology problem unique to rail. It's the reality for any field services company that outgrows spreadsheets but doesn't have the budget or appetite for heavyweight enterprise software.

---

### What We Built

**RailView** is a purpose-built field operations platform that replaces the spreadsheet-and-email workflow with structured data capture, automated reporting, interactive maps, and real-time analytics --- all accessible from a phone.

---

### Key Capabilities

#### 1. Mobile Field Reporting (< 5 Minutes Per Shift)

The core value: field crews submit structured reports from their phone immediately after a shift, with less effort than filling out a spreadsheet.

- **Auto-populated fields** pull forward recent values (operator, equipment, location) so crews only enter what changed
- **Guided data entry** with dropdowns, time pickers, and segment builders --- no free-text guesswork
- **Built-in validation** catches missing fields, impossible time sequences, and incomplete delay explanations before submission
- **Draft/Submit workflow** lets crews save progress and come back
- **Automated stakeholder notifications** --- clients get formatted email reports the moment a shift is submitted, not whenever someone remembers to forward them

Every submission creates a structured, queryable, auditable record. No more lost emails or inconsistent spreadsheet formats.

#### 2. Interactive Maps That Show Where Work Actually Happened

Project managers stop asking "where did we work last week?" and start seeing it:

- **Full network visualization** with color-coded lines and track segments
- **Work overlay** showing completed segments by category (grinding, inspection, welding) with date range filtering
- **Coverage heat map** with two modes:
  - *Pass density* --- which segments have been worked heavily vs. barely touched
  - *Recency* --- which segments are overdue for maintenance (color-coded by days since last activity)
- **Linear reference integration** so geographic positions map directly to the milepost/chainpoint systems that field crews and clients already use

This turns maintenance planning from a conversation about spreadsheet rows into a visual exercise: "here's the gap, that's where we go next."

#### 3. Analytics That Answer the Questions Managers Actually Ask

Four dashboard views replace the monthly spreadsheet exercise:

- **Production Summary** --- how much track did we cover, how productive were shifts, what's our utilization rate? Sparkline trends show whether we're improving or slipping.
- **Time Breakdown** --- where does shift time actually go? A stacked bar chart splits each day into travel, productive work, three categories of delay, and wrap-up. Instantly reveals if crews are losing time to machine issues vs. customer holds.
- **Production Trends** --- daily, weekly, or monthly views of output metrics, filterable by line and work type. Supports the kind of period-over-period comparison that used to require a pivot table.
- **Delay Analysis** --- breakdown by cause (operator, machine, customer), trend over time, and a ranked list of the highest-delay shifts with the crew's own comments explaining what happened.

These aren't vanity dashboards. They answer the questions that drive operational decisions: where to allocate crews, which equipment needs attention, and what to tell the client in the next progress meeting.

#### 4. Multi-Client Architecture

The platform serves multiple clients from a single deployment, with each client getting:

- **Isolated data** --- users see only their assigned clients
- **Configurable units** (imperial/metric, miles/kilometers/feet) matching whatever reference system the client uses
- **Custom segment definitions** so the platform adapts to each client's track network, not the other way around
- **Client-scoped equipment and personnel catalogs**
- **Five-tier role-based access** from system administrator down to view-only external stakeholder

Adding a new client is a configuration task, not a development project.

#### 5. Structured Data from Day One

Every piece of data enters the system in a structured, validated format:

- Shift times with enforced sequencing (call -> departed -> start -> end -> tie-up)
- Work segments with precise linear reference positions (from-chain to to-chain)
- Delay minutes with mandatory categorization and comments
- Equipment and personnel linked from managed catalogs
- Full audit trail: who submitted what, when, and every edit along the way

This means reporting, analytics, and compliance queries work on day one --- not after someone cleans up a spreadsheet.

---

### Results

| Before (Spreadsheets + Email) | After (RailView) |
|-------------------------------|-------------------|
| 15+ minutes to fill out an Excel template after a shift | < 5 minutes on a phone |
| Reports emailed to distribution lists, searched by scrolling inboxes | Structured database with instant filtering, sorting, and export |
| Project managers build manual pivot tables for monthly reports | Real-time dashboards updated with every shift submission |
| "Where did we work?" answered by reading text descriptions | Interactive map with coverage heat maps and work overlays |
| No delay tracking --- or inconsistent free-text notes | Categorized delay minutes with mandatory comments and trend analysis |
| New client = new spreadsheet template + new email list + hope | New client = admin configuration with custom units and segments |
| No access control --- anyone with the spreadsheet has everything | Five-tier RBAC with client-scoped data isolation |
| No audit trail | Full submission history with timestamps and user attribution |

**Infrastructure cost: ~$71/month** for a serverless deployment that auto-scales and requires no server management.

---

### Why This Matters Beyond Rail

RailView was built for rail grinding, but the problem it solves --- **field crews doing real work, then reporting it through spreadsheets and email with no visibility, analytics, or audit trail** --- is universal across field services industries.

The platform's core architecture handles:

- **Structured field data capture** with validation, drafts, and mobile-first design
- **Geographic visualization** of where work was performed, with coverage and recency analysis
- **Time-series analytics** for productivity, utilization, and delay root-cause analysis
- **Multi-tenant client management** with configurable units, catalogs, and access control
- **Automated stakeholder reporting** replacing manual email workflows

These capabilities map directly to any organization that dispatches crews to do work along infrastructure corridors:

**Road & Highway Maintenance** --- Pothole repair, pavement milling, striping, guardrail replacement. Same pattern: crews do work, need to report it, managers need to see where and how productive. Coverage maps show which road segments are maintained vs. neglected. Delay analysis reveals whether downtime is equipment, weather, or permitting.

**Utility Field Services** --- Pipeline inspection, line clearing, meter replacement. Work happens along linear assets with reference systems (pipeline stations, pole numbers). Compliance requires knowing exactly what was inspected, when, and by whom.

**Municipal Public Works** --- Street sweeping, storm drain maintenance, sidewalk repair. City managers need geographic coverage tracking and crew productivity metrics to justify budgets and respond to constituent complaints.

**Environmental Services** --- Vegetation management, erosion control, environmental monitoring along corridors. Regulatory reporting demands structured data with audit trails, not folder trees of spreadsheets.

In every case, the story is the same: the work gets done, but the reporting is manual, the data is unstructured, and the visibility is poor. RailView is the platform that closes that gap.

---

### Technical Foundation

| Layer | Technology |
|-------|-----------|
| Backend | Python (Django), REST API |
| Frontend | React, TypeScript |
| Database | PostgreSQL + PostGIS (geospatial) |
| Mapping | Mapbox GL JS |
| Hosting | Google Cloud Run (serverless containers) |
| Auth | JWT with role-based access control |
| Background Tasks | PostgreSQL-backed queue (no Redis/RabbitMQ) |

The stack is deliberately simple: one language on the backend, one database, no message broker infrastructure, serverless hosting with scale-to-zero. This keeps costs low and operations minimal --- critical for selling into organizations that don't have (and don't want) a DevOps team.

---

### Get In Touch

If your crews do the work but your reporting still lives in spreadsheets and email inboxes, we should talk. RailView can be adapted to your industry, your data, and your clients --- typically in weeks, not months.

---

*This case study describes a production system currently serving U.S. transit authorities.*
