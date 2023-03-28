import rdflib

# Create an RDF graph
g = rdflib.Graph()

# Define namespaces
FOAF = rdflib.Namespace('http://xmlns.com/foaf/0.1/')
SCHEMA = rdflib.Namespace('http://schema.org/')

# Define program node
program_node = rdflib.URIRef('https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html')
g.add((program_node, rdflib.RDF.type, FOAF['Program']))
g.add((program_node, FOAF.name, rdflib.Literal('Canada Child Benefit')))
g.add((program_node, FOAF.description, rdflib.Literal('The Canada Child Benefit is a tax-free monthly payment made to eligible families to help them with the cost of raising children.')))

# Define eligibility criteria
g.add((program_node, FOAF.description, rdflib.Literal('To be eligible for the Canada Child Benefit, you must meet the following criteria:')))
g.add((program_node, SCHEMA.eligibility, rdflib.Literal('Canadian citizens, permanent residents, protected persons, temporary residents, and First Nations children are eligible for the Canada Child Benefit.')))
g.add((program_node, SCHEMA.eligibility, rdflib.Literal('You must live with the child, and the child must be under 18 years of age.')))
g.add((program_node, SCHEMA.eligibility, rdflib.Literal('You must be primarily responsible for the care and upbringing of the child.')))
g.add((program_node, SCHEMA.eligibility, rdflib.Literal('Your adjusted family net income must be below the threshold for your family size.')))

# Define application process
g.add((program_node, FOAF.description, rdflib.Literal('To apply for the Canada Child Benefit, follow these steps:')))
g.add((program_node, SCHEMA.step, rdflib.Literal('1. Make sure you have all the necessary documents and information, such as your Social Insurance Number, your child\'s birth certificate, and your marital status.')))
g.add((program_node, SCHEMA.step, rdflib.Literal('2. Fill out the Canada Child Benefit application form, which can be found on the Canada Revenue Agency website.')))
g.add((program_node, SCHEMA.step, rdflib.Literal('3. Submit your application to the Canada Revenue Agency.')))


# Serialize the graph in Turtle format and save it to a file
with open("canada_child_benefit.ttl", "wb") as f:
    g.serialize(f, format("turtle"))


