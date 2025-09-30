from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

portfolios =
[
  {"name": "Arjun", "role": "Student", "skills": ["webdev", "devops"]},
  {"name": "Sneha", "role": "Alumni", "skills": ["ml", "finance"]},
  {"name": "Vikram", "role": "Student", "skills": ["cybersecurity"]},
  {"name": "Priya", "role": "Alumni", "skills": ["iot", "datascience"]},
  {"name": "Karthik", "role": "Student", "skills": ["datascience"]},
  {"name": "Aisha", "role": "Alumni", "skills": ["cloudcomputing", "devops"]},
  {"name": "Rohan", "role": "Student", "skills": ["dbmanager", "cybersecurity"]},
  {"name": "Geeta", "role": "Alumni", "skills": ["finance"]},
  {"name": "Naveen", "role": "Student", "skills": ["webdev"]},
  {"name": "Lakshmi", "role": "Alumni", "skills": ["ml"]},
  {"name": "Deepak", "role": "Student", "skills": ["devops"]},
  {"name": "Sita", "role": "Alumni", "skills": ["iot"]},
  {"name": "Amit", "role": "Student", "skills": ["datascience"]},
  {"name": "Meena", "role": "Alumni", "skills": ["webdev", "datascience"]},
  {"name": "Rajesh", "role": "Student", "skills": ["cybersecurity", "dbmanager"]},
  {"name": "Sarita", "role": "Alumni", "skills": ["finance"]},
  {"name": "Manish", "role": "Student", "skills": ["ml"]},
  {"name": "Shilpa", "role": "Alumni", "skills": ["webdev"]},
  {"name": "Ravi", "role": "Student", "skills": ["devops"]},
  {"name": "Anjali", "role": "Alumni", "skills": ["iot"]},
  {"name": "Suresh", "role": "Student", "skills": ["datascience"]},
  {"name": "Pooja", "role": "Alumni", "skills": ["cloudcomputing"]},
  {"name": "Vivek", "role": "Student", "skills": ["dbmanager"]},
  {"name": "Aditi", "role": "Alumni", "skills": ["finance"]},
  {"name": "Rahul", "role": "Student", "skills": ["ml"]},
  {"name": "Kiran", "role": "Alumni", "skills": ["webdev"]},
  {"name": "Harish", "role": "Student", "skills": ["devops", "cloudcomputing"]},
  {"name": "Deepika", "role": "Alumni", "skills": ["iot"]},
  {"name": "Ganesh", "role": "Student", "skills": ["datascience", "ml"]},
  {"name": "Jaya", "role": "Alumni", "skills": ["cybersecurity"]},
  {"name": "Pranav", "role": "Student", "skills": ["ml"]},
  {"name": "Swetha", "role": "Alumni", "skills": ["webdev"]},
  {"name": "Rohit", "role": "Student", "skills": ["finance", "cybersecurity"]},
  {"name": "Nisha", "role": "Alumni", "skills": ["iot"]},
  {"name": "Alok", "role": "Student", "skills": ["datascience"]},
  {"name": "Riya", "role": "Alumni", "skills": ["cloudcomputing"]},
  {"name": "Arvind", "role": "Student", "skills": ["cybersecurity"]},
  {"name": "Shruti", "role": "Alumni", "skills": ["ml", "finance"]},
  {"name": "Vikas", "role": "Student", "skills": ["webdev", "devops"]},
  {"name": "Priya", "role": "Alumni", "skills": ["ml"]},
  {"name": "Manas", "role": "Student", "skills": ["finance", "cybersecurity"]},
  {"name": "Kavita", "role": "Alumni", "skills": ["webdev"]},
  {"name": "Anand", "role": "Student", "skills": ["devops"]},
  {"name": "Shreya", "role": "Alumni", "skills": ["iot"]},
  {"name": "Varun", "role": "Student", "skills": ["datascience"]},
  {"name": "Neelam", "role": "Alumni", "skills": ["cybersecurity"]},
  {"name": "Sanjay", "role": "Student", "skills": ["ml"]},
  {"name": "Pooja", "role": "Alumni", "skills": ["webdev"]},
  {"name": "Abhishek", "role": "Student", "skills": ["finance"]},
  {"name": "Divya", "role": "Alumni", "skills": ["ml", "cloudcomputing"]}
]
names = [p["name"] for p in portfolios]
skills_texts = [" ".join(p["skills"]) for p in portfolios]

# Fixed basis vector (vocabulary)
basis_skills = [
    "webdev", "ml", "finance", "cybersecurity",
    "devops", "iot", "datascience",
    "cloudcomputing", "dbmanager"
]

vectorizer = TfidfVectorizer(vocabulary=basis_skills)
X = vectorizer.fit_transform(skills_texts).toarray()

# find best number of clusters dynamically
best_score = -1
best_k = 0
best_labels = None

for k in range(2, min(len(X), 10)):  # try k=2 to 9
    agg = AgglomerativeClustering(n_clusters=k, linkage="ward")
    labels = agg.fit_predict(X)
    score = silhouette_score(X, labels)
    print(f"k={k}, silhouette={score:.3f}")
    if score > best_score:
        best_score = score
        best_k = k
        best_labels = labels

print(f"\nOptimal clusters = {best_k}, silhouette score = {best_score:.3f}")

# Assign best cluster labels
for i, p in enumerate(portfolios):
    p["cluster"] = int(best_labels[i])

# Recommendation function
def recommend_within_cluster(input_skills, top_n=3):
    input_vec = vectorizer.transform([" ".join(input_skills)]).toarray()

    # Refit with best_k clusters
    agg = AgglomerativeClustering(n_clusters=best_k, linkage="ward")
    all_vectors = np.vstack([X, input_vec])
    labels = agg.fit_predict(all_vectors)
    cluster_id = labels[-1]  # new portfolio's cluster

    same_cluster_indices = [i for i, p in enumerate(portfolios) if p["cluster"] == cluster_id]

    similarities = []
    for i in same_cluster_indices:
        sim_score = cosine_similarity(input_vec, X[i].reshape(1, -1))[0][0]
        similarities.append((names[i], portfolios[i]["role"], sim_score))

    similarities.sort(key=lambda x: x[2], reverse=True)
    return cluster_id, similarities[:top_n]

if __name__ == "__main__":
    print("\nBasis Vectors:", basis_skills)
    input_skills = input("Enter skills for new portfolio (comma-separated): ").strip().split(",")
    input_skills = [s.strip().lower() for s in input_skills]

    cluster_id, recommendations = recommend_within_cluster(input_skills)

    print(f"\nInput portfolio belongs to Cluster {cluster_id}")
    print("Top matches in this cluster:")
    for rec in recommendations:
        print(f"- {rec[0]} ({rec[1]}), similarity: {rec[2]:.2f}")
