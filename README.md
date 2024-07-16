# Activity Diagram

``` mermaid
flowchart TD
    G[Export Trained Model] --> H[FastAPI Setup]
    H --> I[Load Model in FastAPI]
    I --> J[Define API Endpoints]
    J --> K[Next.js Frontend Setup]
    K --> L[Integrate API with Frontend]
    L --> M[UI Design]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant A as User
    participant B as Data Collection
    participant C as Data Cleaning
    participant D as Model Training
    participant E as Model Deployment
    participant F as API Development
    participant G as Frontend Development

    A ->> B: Collect data
    B ->> C: Clean data using regex
    C ->> D: Split data into train-test sets
    D ->> D: Train Random Forest model
    D ->> E: Export trained model
    E ->> F: Load model into FastAPI
    F ->> F: Set up FastAPI
    F ->> G: Develop Next.js frontend
    G ->> F: Integrate with API endpoints
    G ->> A: Display UI for user interaction
```

## Use Case Diagram

```mermaid
graph LR
    A[User] --> B(Data Collection)
    A --> G(Frontend Interaction)
    B --> C(Data Cleaning)
    C --> D(Data Splitting)
    D --> F(Train Random Forest)
    F --> J(Export Model)
    J --> K(FastAPI Setup)
    K --> L(Load Model)
    L --> M(Define Endpoints)
    M --> N(API Usage)
    G --> N
```

## data cleaning module

```mermaid
graph LR;
    A[Data Sources] --> B[Data Cleaning]
    B --> C[Preprocessed Data]
```

## data train module

```mermaid
graph LR;
    A[Preprocessed Data] --> B[Train Decision Tree]
    A --> C[Train Random Forest]
    B --> D[Evaluate Decision Tree]
    C --> D
    D --> E[Select Best Model]
```

## data select module

```mermaid
graph LR;
    A[Selected Model] --> B[Serialize Model]
    B --> C[Export Serialized Model]
```

## API Development Module (FastAPI)

```mermaid
graph LR;
    A[Serialized Model] --> B[Load Model in FastAPI]
    B --> C[Define API Endpoints]
    C --> D[Handle Requests]
```

## Frontend Development Module (Next.js)

```mermaid
graph LR;
    A[API Endpoint] --> B[User Interaction]
    B --> C[Submit Input]
    C --> D[Send Request to API]
    D --> E[Receive Prediction]
    E --> F[Display Result]
```
